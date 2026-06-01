const { fetchGithubProfile } = require("../services/githubService");

const { createProfile, getAllProfiles, getProfileByUsername } = require("../models/profileModel");

const analyzeProfile = async (req, res, next) => {
    try {
        const { username } = req.params;

        const githubData = await fetchGithubProfile(username);
        
        const profile = {
            username: githubData.login,
            name: githubData.name,
            bio: githubData.bio,
            public_repos: githubData.public_repos,
            followers: githubData.followers,
            following: githubData.following,
            account_created_at: new Date(githubData.created_at).toISOString().slice(0, 19).replace("T", " "),
            profile_url: githubData.html_url
        };


        await createProfile(profile);

        res.status(200).json({
            success: true,
            message: "Profile analyzed successfully",
            data: profile
        });

    } catch (error) {
        next(error);
    }
};

const getProfiles = async (req, res, next) => {
    try {
        const profiles = await getAllProfiles();

        res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles
        });
    } catch (error) {
        next(error);
    }
};

const getSingleProfile = async (req, res, next) => {
    try {
        const { username } = req.params;

        const profile = await getProfileByUsername(username);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { analyzeProfile, getProfiles, getSingleProfile };