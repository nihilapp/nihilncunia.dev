export const messageData = {
  common: {
    success: '요청이 성공적으로 처리되었습니다.',
    error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    unauthorized: '권한이 없습니다.',
    forbidden: '접근이 금지되었습니다.',
    notFound: '요청한 리소스를 찾을 수 없습니다.',
    invalidRequest: '잘못된 요청입니다.',
    alreadyExists: '이미 존재하는 항목입니다.',
    deleted: '성공적으로 삭제되었습니다.',
  },

  auth: {
    signUpSuccess: '관리자 계정이 성공적으로 생성되었습니다.',
    signUpError: '회원가입 중 오류가 발생했습니다.',
    signInSuccess: '성공적으로 로그인되었습니다.',
    signInError: '로그인 중 오류가 발생했습니다.',
    signOutSuccess: '성공적으로 로그아웃되었습니다.',
    emailInUse: '이미 등록된 이메일입니다.',
    invalidCredentials: '이메일 또는 비밀번호가 올바르지 않습니다.',
    sessionExpired: '세션이 만료되었습니다. 다시 로그인해주세요.',
  },

  user: {
    createSuccess: '관리자가 생성되었습니다.',
    updateSuccess: '관리자 정보가 수정되었습니다.',
    passwordChangeSuccess: '비밀번호가 변경되었습니다.',
    imageChangeSuccess: '프로필 이미지가 변경되었습니다.',
    listSuccess: '관리자 목록 조회가 완료되었습니다.',
    listError: '관리자 목록 조회를 실패했습니다.',
    fetchSuccess: '관리자 상세 정보 조회가 완료되었습니다.',
    fetchError: '관리자 상세 정보 조회를 실패했습니다.',
    emailExists: '해당 이메일은 이미 사용 중입니다.',
    nameExists: '해당 이름은 이미 존재합니다.',
    deleteSuccess: '관리자가 삭제되었습니다.',
    notFound: '해당 관리자를 찾을 수 없습니다.',
  },

  post: {
    createSuccess: '포스트가 성공적으로 작성되었습니다.',
    updateSuccess: '포스트가 수정되었습니다.',
    deleteSuccess: '포스트가 삭제되었습니다.',
    publishSuccess: '공개 상태가 변경되었습니다.',
    likeSuccess: '좋아요를 추가했습니다.',
    unlikeSuccess: '좋아요를 취소했습니다.',
    draftSaved: '임시 저장되었습니다.',
    restoreSuccess: '임시 저장본을 복구했습니다.',
    autoSaveSuccess: '자동 저장되었습니다.',
    batchDeleteSuccess: '포스트가 일괄 삭제되었습니다.',
  },

  category: {
    createSuccess: '카테고리가 생성되었습니다.',
    updateSuccess: '카테고리가 수정되었습니다.',
    deleteSuccess: '카테고리가 삭제되었습니다.',
    reorderSuccess: '카테고리 순서가 변경되었습니다.',
    statusChangeSuccess: '카테고리 상태가 변경되었습니다.',
  },

  hashtag: {
    createSuccess: '해시태그가 생성되었습니다.',
    updateSuccess: '해시태그가 수정되었습니다.',
    deleteSuccess: '해시태그가 삭제되었습니다.',
  },

  comment: {
    createSuccess: '댓글이 등록되었습니다.',
    replySuccess: '답글이 등록되었습니다.',
    updateSuccess: '댓글이 수정되었습니다.',
    deleteSuccess: '댓글이 삭제되었습니다.',
    approveSuccess: '댓글 상태가 변경되었습니다.',
    verifyFail: '비밀번호가 일치하지 않습니다.',
  },

  upload: {
    imageUploadSuccess: '이미지가 업로드되었습니다.',
    imageDeleteSuccess: '이미지가 삭제되었습니다.',
    imageUpdateSuccess: '이미지 정보가 수정되었습니다.',
  },

  email: {
    logCreated: '이메일 로그가 저장되었습니다.',
    resendSuccess: '이메일이 재발송되었습니다.',
    statsFetched: '이메일 통계가 조회되었습니다.',
  },

  analytics: {
    viewsFetched: '전체 조회수 데이터가 불러와졌습니다.',
    likesFetched: '전체 좋아요 데이터가 불러와졌습니다.',
  },

  admin: {
    statsFetched: '관리자 통계가 조회되었습니다.',
    backupSuccess: '데이터가 백업되었습니다.',
    restoreSuccess: '데이터가 복원되었습니다.',
  },

  blog: {
    fetchSuccess: '블로그 정보가 불러와졌습니다.',
    notFound: '블로그를 찾을 수 없습니다.',
    multiBlogLimit: '생성 가능한 블로그 수를 초과했습니다.',
    createSuccess: '새 블로그가 생성되었습니다.',
    updateSuccess: '블로그 설정이 수정되었습니다.',
    deleteSuccess: '블로그가 삭제되었습니다.',
  },
};
