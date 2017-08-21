export default {
  state: {
    validateMessage: {
      USER_NAME_EMPTY: '이름을 입력해주세요.',
      USER_EMAIL_EMPTY: '이메일 입력해주세요.',
      USER_EMAIL_OK: '사용할 수 있는 이메일 입니다.',
      USER_EMAIL_NOT_OK: '올바른 이메일 주소를 입력해주세요.',
      USER_EMAIL_DUPLICATE: '중복된 이메일입니다.',
      USER_PASSWORD_EMPTY: '비밀번호 입력해주세요.',
      USER_PASSWORD_OK: '올바른 패스워드 형식입니다.',
      USER_PASSWORD_NOT_OK: '대문자, 소문자, 숫자를 포함해야합니다.',
      USER_HOBBY_EMPTY: '관심사를 선택 해주세요.',
      USER_LOCATION_EMPTY: '지역을 선택해주세요.',
      BOARD_TITLE_EMPTY: '게시글 제목을 입력해주세요.',
      BOARD_CONTENT_EMPTY: '게시글 내용을 입력해주세요.',
      GROUP_NAME_EMPTY: '그룹명을 입력해주세요.',
      GROUP_DESCRIPTION_EMPTY: '그룹설명을 입력해주세요.',
      GROUP_LOCATION_EMPTY: '모임지역을 선택해주세요.',
    },
  },
  getters: {
    validateMessage(state) {
      return state.validateMessage;
    },
  }
};