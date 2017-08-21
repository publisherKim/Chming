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
      GROUP_ALBUM_EMPTY: '더 이상 포토 앨범이 없습니다.',
      USER_HOBBY_MAX: '관심사는 5개까지 선택 할 수 있습니다.',
      GROUP_ACCESS: '모임가입을 해주세요.',
      // ALBUMEMPTY: '더 이상 포토 앨범이 없습니다.',
      // HOBBYMAX: '관심사는 5개까지 선택 할수 있습니다.',
      // GROUPJOIN: '그룹에 회원가입을 해야 볼 수 있습니다.',
    },
  },
  getters: {
    validateMessage(state) {
      return state.validateMessage;
    },
  }
};