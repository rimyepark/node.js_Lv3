const profilesRepository = require('../repositories/profiles.repository');

class ProfileService {
    ProfilesRepository = new profilesRepository();

    findProfileById = async (user_id) => {
        const findProfile = await this.profilesRepository.findProfileById(user_id);
    
        return {
          
            login_id: findProfile.login_id,
            nickname: findProfile.nickname,
            email: findProfile.email,
            myphoto: findProfile.myphoto,
            mySNS: findProfile.mySNS,
            introduction: findProfile.introduction
        };
      };

      updateProfile = async (password, nickname , email, myphoto, mySNS, introduction) => {
        const findPost = await this.postRepository.findPostById(postId);
        if (!findPost) throw new Error("Post doesn't exist");
    
        await this.postRepository.updateProfile(password, nickname , email, myphoto, mySNS, introduction);
    
        const updateProfile = await this.profilesRepository.findProfileById(user_id);
    
        return {
          password: updateProfile.password,
          nickname: updateProfile.nickname,
          email: updateProfile.email,
          myphoto: updateProfile.myphoto,
          mySNS: updateProfile.mySNS,
          introduction: updateProfile.introduction,
        };
      };
  
}

module.exports = ProfileService;