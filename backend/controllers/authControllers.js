const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/authMiddleware');
const axios = require('axios');
const Questionnaire = require('../models/QuestionnaireModel');
const { generateWithGemini } = require('../utils/geminiUtils');

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
};

// SIGNUP
exports.signup = async (req, res) => {
    console.log('Received signup payload:', req.body);
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server Error. Please try again.' });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find user by email or name
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { name: emailOrUsername }]
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error. Please try again.' });
    }
};


// questions part
exports.submitAnswer = async (req, res) => {
    try {
        const data = req.body;
        data.userId = req.user.id;
        const saved = await Questionnaire.create(data);        
  
      res.status(201).json({ success: true, message: 'Answers saved', data: saved });
    } catch (err) {
      console.error('❌ Error saving questionnaire:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };



// post generate

exports.postGenerate = async (req, res) => {
    try {
      const userId = req.user.id; // Comes from protect middleware
      const { style } = req.body;
  
      if (!style) {
        return res.status(400).json({ success: false, message: 'Style is required' });
      }
  
      // 🔍 Fetch latest questionnaire for this user
      const latestAnswers = await Questionnaire.findOne({ userId }).sort({ createdAt: -1 });
  
      if (!latestAnswers) {
        return res.status(404).json({ message: "No questionnaire found for this user" });
      }
  
      // 🧠 Rebuild `userData` from DB
      const userData = {
        personalIntro: latestAnswers.name || "A passionate professional",
        profession: latestAnswers.whatYouDo,
        contentFocus: [latestAnswers.wantToBeKnownFor, latestAnswers.goal],
        hobbies: latestAnswers.hobbies || "reading, music", // optional fallback
        sports: latestAnswers.sports || [],
        goals: latestAnswers.goal,
        audience: latestAnswers.audience
      };
  
      // 💬 Build Prompt
      const buildPrompt = (userData, style) => {
        const styles = {
          professional: `- Focus on industry insights and professional tips...`,
          casual: `- Use a conversational, friendly tone...`,
          storytelling: `- Tell a compelling personal or professional story...`
        };
  
        return `
  You are an expert social media content creator. Create a ${style} LinkedIn post for this user:
  
  - Personal Description: ${userData.personalIntro}
  - Profession: ${userData.profession}
  - Content Focus: ${userData.contentFocus.join(', ')}
  - Hobbies: ${userData.hobbies}
  - Sports/Activities: ${userData.sports?.join(', ') || 'None'}
  - Goal: ${userData.goals}
  - Audience: ${userData.audience}
  
  Style Guidelines:
  ${styles[style]}
  
  Requirements:
  - First person voice
  - Authentic and engaging
  - Emojis (but not overused)
  - 3-5 hashtags
  - 150-300 words
  - End with a question or call to action
  Only return the post text.
  `;
      };

      // Helper function to simulate engagement metrics
const generateEngagementMetrics = (content, userData) => {
  const hasHashtags = content.includes('#');
  const hasQuestion = content.includes('?');
  const hasEmoji = /[\u{1F600}-\u{1F6FF}]/u.test(content);

  let likes = 100 + Math.floor(Math.random() * 100);
  let comments = 10 + Math.floor(Math.random() * 20);
  let shares = 5 + Math.floor(Math.random() * 10);

  if (hasEmoji) likes *= 1.2;
  if (hasHashtags) shares *= 1.2;
  if (hasQuestion) comments *= 1.3;

  return {
    likes: Math.floor(likes),
    comments: Math.floor(comments),
    shares: Math.floor(shares),
    views: Math.floor(likes * 10) // extra metric for your frontend
  };
};

  
      //  Gemini Call
      const prompt = buildPrompt(userData, style);
      const content = await generateWithGemini(prompt);
  
      //  Engagement Simulation
      const engagement = generateEngagementMetrics(content, userData);
  
      //  Response
      res.json({
        success: true,
        data: {
          userData,
          content,
          engagement,
          style,
          platform: 'linkedin',
          generatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Generate Post Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
 
  // Linkedin Authentication

//   const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
//   const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
//   const REDIRECT_URI = "http://localhost:5000/api/auth/linkedin/callback"; // backend redirect

// // Step 1: Redirect user to LinkedIn OAuth
// exports.loginWithLinkedIn = (req, res) => {
//   const scope = "openid profile email w_member_social"; 
//   //const state = "randomstring123"; // Better to generate securely
//   const state = req.query.token; // store token in state
//   const authURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
//     REDIRECT_URI
//   )}&scope=${encodeURIComponent(scope)}&state=${state}`;

//   res.redirect(authURL);
// };

// // Step 2: Handle LinkedIn callback
// exports.linkedinCallback = async (req, res) => {
//   const code = req.query.code;
//   const state = req.query.state;


//   try {
//     // Decode the JWT from state
//     const decoded = jwt.verify(state, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     // Exchange code for access token
//     const tokenRes = await axios.post(
//       "https://www.linkedin.com/oauth/v2/accessToken",
//       null,
//       {
//         params: {
//           grant_type: "authorization_code",
//           code,
//           redirect_uri: REDIRECT_URI,
//           client_id: CLIENT_ID,
//           client_secret: CLIENT_SECRET,
//         },
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       }
//     );

//     const accessToken = tokenRes.data.access_token;

//     // Get user profile from LinkedIn
//     const profileRes = await axios.get("https://api.linkedin.com/v2/userinfo", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const linkedinProfile = profileRes.data;

//     // Find user in DB (assuming you already logged in your user)
//     // const userId = req.user?._id; // <- make sure req.user is available (auth middleware)
//     // if (!userId) {
//     //   return res.status(401).json({ message: "User not logged in" });
//     // }

//     // Save LinkedIn token to user model
//     await User.findByIdAndUpdate(userId, {
//       linkedinId: linkedinProfile.sub,
//       linkedinAccessToken: accessToken,
//     });

//     // Redirect back to frontend
//     res.redirect("http://localhost:3000/demo?linkedin=connected");
//   } catch (err) {
//     console.error("LinkedIn OAuth error:", err.response?.data || err.message);
//     res.status(500).json({ error: "LinkedIn authentication failed" });
//   }
// };

// // Step 3: Post to LinkedIn on behalf of user
// exports.postToLinkedIn = async (req, res) => {
//   const { text } = req.body;
//   const userId = req.user._id;

//   try {
//     const user = await User.findById(userId);
//     if (!user || !user.linkedinAccessToken) {
//       return res.status(400).json({ error: "LinkedIn not connected" });
//     }

//     // Get LinkedIn profile ID
//     const profileRes = await axios.get("https://api.linkedin.com/v2/me", {
//       headers: { Authorization: `Bearer ${user.linkedinAccessToken}` },
//     });

//     const profileId = profileRes.data.id;

//     // Create LinkedIn post
//     const postRes = await axios.post(
//       "https://api.linkedin.com/v2/ugcPosts",
//       {
//         author: `urn:li:person:${profileId}`,
//         lifecycleState: "PUBLISHED",
//         specificContent: {
//           "com.linkedin.ugc.ShareContent": {
//             shareCommentary: { text },
//             shareMediaCategory: "NONE",
//           },
//         },
//         visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${user.linkedinAccessToken}`,
//           "Content-Type": "application/json",
//           "X-Restli-Protocol-Version": "2.0.0",
//         },
//       }
//     );

//     res.json({ success: true, postUrl: postRes.data });
//   } catch (err) {
//     console.error("Error posting to LinkedIn:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to post on LinkedIn" });
//   }
// };


const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/api/auth/linkedin/callback"; // backend redirect
  
// Step 1: Redirect user to LinkedIn OAuth
exports.loginWithLinkedIn = (req, res) => {
  const scope = "openid profile email w_member_social ";
  const state = req.query.token; // store token in state (⚠️ ensure it's short-lived)
  const authURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authURL);
};

// Step 2: Handle LinkedIn callback
exports.linkedinCallback = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  try {
    // Decode the JWT from state
    let decoded;
    try {
      decoded = jwt.verify(state, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired session token" });
    }

    const userId = decoded.id;

    // Exchange code for access token
    const tokenRes = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = tokenRes.data.access_token;
    const idToken = tokenRes.data.id_token; // ✅ comes with OIDC

    // Decode ID token to get user profile + email
    const oidcProfile = jwt.decode(idToken);

    const linkedinProfile = {
      sub: oidcProfile.sub, // unique LinkedIn user ID
      name: oidcProfile.name,
      email: oidcProfile.email,
      picture: oidcProfile.picture,
    };

    // ✅ Use /me instead of /userinfo for consistency
    // const profileRes = await axios.get(
    //   "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)",
    //   { headers: { Authorization: `Bearer ${accessToken}` } }
    // );

    // const emailRes = await axios.get(
    //   "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
    //   { headers: { Authorization: `Bearer ${accessToken}` } }
    // );

    // const linkedinProfile = {
    //   id: profileRes.data.id,
    //   firstName: profileRes.data.localizedFirstName,
    //   lastName: profileRes.data.localizedLastName,
    //   email: emailRes.data.elements[0]["handle~"].emailAddress,
    // };

    console.log("OIDC Profile:", oidcProfile);

    // Save LinkedIn token to user model
    await User.findByIdAndUpdate(userId, {
      linkedinSub: linkedinProfile.sub,
      linkedinAccessToken: accessToken,
      linkedinName: linkedinProfile.name,
      linkedinEmail: linkedinProfile.email,
      linkedinPicture: linkedinProfile.picture
    });

    // Redirect back to frontend
    res.redirect("http://localhost:5173/demo?linkedin=connected");
  } catch (err) {
    console.error("LinkedIn OAuth error:", err.response?.data || err.message);
    res.status(500).json({ error: "LinkedIn authentication failed" });
  }
};

// Step 3: Post to LinkedIn on behalf of user
exports.postToLinkedIn = async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user || !user.linkedinAccessToken || !user.linkedinSub) {
      return res.status(400).json({ error: "LinkedIn not connected" });
    }

    // Get LinkedIn profile ID
    // const profileRes = await axios.get("https://api.linkedin.com/v2/me", {
    //   headers: { Authorization: `Bearer ${user.linkedinAccessToken}` },
    // });

    // const profileId = profileRes.data.id;
    const profileId = user.linkedinSub;

    // Build LinkedIn post payload
    const payload = {
      author: `urn:li:person:${profileId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    console.log("LinkedIn post payload:", payload);

    // Create LinkedIn post
    // const postRes = await axios.post(
    //   "https://api.linkedin.com/v2/ugcPosts",
    //   {
    //     author: `urn:li:person:${profileId}`,
    //     lifecycleState: "PUBLISHED",
    //     specificContent: {
    //       "com.linkedin.ugc.ShareContent": {
    //         shareCommentary: { text: content },
    //         shareMediaCategory: "NONE",
    //       },
    //     },
    //     visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${user.linkedinAccessToken}`,
    //       "Content-Type": "application/json",
    //       "X-Restli-Protocol-Version": "2.0.0",
    //     },
    //   }
    // );

    const postRes = await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.linkedinAccessToken}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    res.json({ success: true, postUrl: postRes.data });
  } catch (err) {
    console.error("Error posting to LinkedIn:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to post on LinkedIn", details: err.response?.data || err.message });
  }
};

  

// exports.postGenerate =  (protect, async (req, res) => {
//     try {
//       const { userData, style } = req.body;
//       if (!userData || !style) {
//         return res.status(400).json({ success: false, message: 'Missing userData or style' });
//       }
      

//     //   Promt builder
//       const buildPrompt = (userData, style) => {
//         const styles = {
//           professional: `- Focus on industry insights and professional tips...`,
//           casual: `- Use a conversational, friendly tone...`,
//           storytelling: `- Tell a compelling personal or professional story...`
//         };
      
//         return `
//       You are an expert social media content creator. Create a ${style} LinkedIn post for this user:
      
//       - Personal Description: ${userData.personalIntro}
//       - Profession: ${userData.profession}
//       - Content Focus: ${userData.contentFocus.join(', ')}
//       - Hobbies: ${userData.hobbies}
//       - Sports/Activities: ${userData.sports?.join(', ') || 'None'}
//       - Goal: ${userData.goals}
//       - Audience: ${userData.audience}
      
//       Style Guidelines:
//       ${styles[style]}
      
//       Requirements:
//       - First person voice
//       - Authentic and engaging
//       - Emojis (but not overused)
//       - 3-5 hashtags
//       - 150-300 words
//       - End with a question or call to action
//       Only return the post text.
//       `;
//       };

      
// // Gemini API call
// const generateWithGemini = async (prompt) => {
//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//         {
//           contents: [{ parts: [{ text: prompt }] }],
//           generationConfig: {
//             temperature: 0.7,
//             topK: 40,
//             topP: 0.95,
//             maxOutputTokens: 1024
//           }
//         },
//         { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
//       );
  
//       const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (!content) throw new Error('Empty content from Gemini');
//       return content;
//     } catch (error) {
//       console.error('Gemini error:', error.response?.data || error.message);
//       throw new Error('Gemini API failed');
//     }
//   };
  
//   // Engagement Metrics
//   const generateEngagementMetrics = (content, userData) => {
//     const hasHashtags = content.includes('#');
//     const hasQuestion = content.includes('?');
//     const hasEmoji = /[\u{1F600}-\u{1F6FF}]/u.test(content);
  
//     let likes = 100 + Math.floor(Math.random() * 100);
//     let comments = 10 + Math.floor(Math.random() * 20);
//     let shares = 5 + Math.floor(Math.random() * 10);
  
//     if (hasEmoji) likes *= 1.2;
//     if (hasHashtags) shares *= 1.2;
//     if (hasQuestion) comments *= 1.3;
  
//     return {
//       likes: Math.floor(likes),
//       comments: Math.floor(comments),
//       shares: Math.floor(shares)
//     };
//   };
  
//       const prompt = buildPrompt(userData, style);
//       const content = await generateWithGemini(prompt);
//       const engagement = generateEngagementMetrics(content, userData);
  
//       res.json({
//         success: true,
//         data: {
//           content,
//           engagement,
//           style,
//           platform: 'linkedin',
//           generatedAt: new Date().toISOString()
//         }
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   });


