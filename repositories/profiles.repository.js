const { users } = require('../models');

class profilesRepository {

    findProfileById = async (user_id) => {
        const profile = await users.findByPk(user_id);
    
        return profile;
      };

      updateProfile = async (password, nickname , email, myphoto, mySNS, introduction) => {
        const updateProfileData = await users.update(
          { password, nickname , email, myphoto, mySNS, introduction },
          { where: { user_id } }
        );
    
        return updateProfileData;
      };
}



module.exports = profilesRepository;