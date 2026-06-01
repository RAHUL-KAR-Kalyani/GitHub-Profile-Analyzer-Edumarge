const db = require("../config/db");

const createProfile = async (profile) => {
    const query = `
        INSERT INTO github_profiles
        (
            username,
            name,
            bio,
            public_repos,
            followers,
            following,
            account_created_at,
            profile_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            bio = VALUES(bio),
            public_repos = VALUES(public_repos),
            followers = VALUES(followers),
            following = VALUES(following),
            account_created_at = VALUES(account_created_at),
            profile_url = VALUES(profile_url)
    `;

    const values = [
        profile.username,
        profile.name,
        profile.bio,
        profile.public_repos,
        profile.followers,
        profile.following,
        profile.account_created_at,
        profile.profile_url
    ];

    const [result] = await db.execute(query, values);

    return result;
};

const getAllProfiles = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM github_profiles ORDER BY analyzed_at DESC"
    );

    return rows;
};

const getProfileByUsername = async (username) => {
    const [rows] = await db.execute(
        "SELECT * FROM github_profiles WHERE username = ?",
        [username]
    );

    return rows[0];
};

module.exports = {
    createProfile,
    getAllProfiles,
    getProfileByUsername
};