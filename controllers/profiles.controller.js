const ProfileService = require('../services/profiles.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class ProfilesController {
  profileService = new ProfileService (); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getProfileById = async (req, res, next) => {
    const { user_id } = req.params;
    const profile = await this.profileService.findProfileById(user_id);

    res.status(200).json({ data: profile });
  };

  updateProfile = async (req, res, next) => {
    const { user_id } = req.params;
    const { password, nickname , email, myphoto, mySNS, introduction } = req.body;
    // newPassword, confirmPassword
    const updateProfile = await this.profileService.updateProfile(
      nickname,
      password,
      email, 
      myphoto, 
      mySNS, 
      introduction, 
    //   newPassword,
    //   confirmPassword
    );

    res.status(200).json({ data: updateProfile });
  };


 
}

module.exports = ProfilesController;