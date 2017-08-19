export default {
  state: {
    validate: {
      USERNAME: '이름을 입력해주세요.',
      USEREMAIL: '이메일 입력해주세요.',
      USEREMAILALLRIGHT: '올바른 이메일 주소를 입력해주세요',
      USEREMAILOK: '사용할 수 있는 이메일 입니다.',
      UESEREMAILDUPLICATE: '중복된 이메일입니다.',
      PASSWORDINPUT: '비밀번호 입력해주세요.',
      PASSWORDTYPE: '올바른 패스워드 형식입니다.',
      PASSWORDRULE: '대문자, 소문자, 숫자를 포함해야합니다.',
      USERHOBBY: '관심사를 선택 해주세요',
      USERLOCATION: '지역을 선택해주세요',
      BORARDTITLE: '제목을 잊어버리셨군요? 잊지말아주세용 &^&',
      BOARDCONTENT: '게시판 내용을 풍성하게 채워주세요',
      GROUPNAME: '그룹명을 입력해주세요.',
      GROUPDESCRIPTION: '그룹설명을 입력해주세요.',
      GROUPLOCATION: '모임지역을 선택해주세요'
    },
  },
  getters: {
    message(state) {
      return state.validate;
    },
  }
};