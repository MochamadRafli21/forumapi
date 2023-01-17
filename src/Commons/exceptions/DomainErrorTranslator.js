const InvariantError = require('./InvariantError');
const NotFoundError = require('./NotFoundError');
const AuthorizationError = require('./AuthorizationError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Pesan apapun selama tidak kosong'),
  'CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'),
  'CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Pesan apapun selama tidak kosong'),
  'CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION':new InvariantError('Tidak dapat membuat comment karena type data tidak sesuai'),
  'RETRIEVED_THREAD.NOT_FOUND': new NotFoundError('Thread Tidak ditemukan'),
  'VERIFY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat menemukan comment karena data tidak lengkap'),
  'VERIFY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Tidak dapat menemukan comment karena tipe data tidak sesuai'),
  'VERIFIED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new NotFoundError('Tidak dapat menemukan comment'),
  'VERIFIED_COMMENT.DATA_TYPE_NOT_MATCH': new InvariantError('Tidak dapat menemukan comment karena tipe data tidak sesuai'),
  'VERIFIED_COMMENT.OWNER_NOT_MATCH': new AuthorizationError('Tidak dapat menemukan comment, anda tidak memiliki hak akses'),
  'DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat Menghapus comment karena data tidak lengkap'),
  'CREATED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat membuat reply karena data tidak lengkap'),
  'CREATED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Tidak dapat membuat reply karena tipe data tidak sesuai'),
  'CREATE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat membuat reply karena tipe data tidak lengkap'),
  'CREATE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Tidak dapat membuat reply karena tipe data tidak sesuai'),
  'DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat menghapus reply karena data tidak lengkap'),
  'VERIFIED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat menemukan reply karena data tidak lengkap'),
  'VERIFIED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Tidak dapat menemukan reply karena tipe data tidak sesuai'),
  'VERIFIED_REPLY.OWNER_NOT_MATCH': new AuthorizationError('Tidak dapat menemukan reply, anda tidak memiliki hak akses'),
  'VERIFY_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat menemukan reply karena data tidak lengkap'),
  'VERIFY_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Tidak dapat menemukan reply karena tipe data tidak sesuai'),
  'RETRIEVED_COMMENT.NOT_FOUND': new NotFoundError('Tidak dapat menemukan reply'),
  'VERIFIED_REPLY.NOT_FOUND_REPLY': new NotFoundError('Tidak dapat menemukan reply'),
  'VERIFIED_THREAD.NOT_FOUND':new NotFoundError('Thread Tidak dapat ditemukan'),
  'DELETED_COMMENT.FAILED_TO_REMOVE_COMMENT':new InvariantError('Gagal Menghapus comment'),
  'DELETED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Gagal Menghapus comment karena data tidak lengkap'),
  'DELETED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION':new InvariantError('Gagal Menghapus comment karena tipe data tidak sesuai'),
  'DELETED_REPLY.FAILED_TO_REMOVE_REPLY':new InvariantError('Gagal Menghapus Reply'),
  'DELETED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Gagal Menghapus reply karena data tidak lengkap'),
  'DELETED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION':new InvariantError('Gagal Menghapus reply karena tipe data tidak sesuai'),
  'ADDED_LIKE.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Gagal Menyukai Komentar karena data tidak lengkap'),
  'ADDED_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION':new InvariantError('Gagal Menyukai Komentar karena tipe data tidak sesuai'),
  'ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Gagal Menyukai Komentar karena data tidak lengkap'),
  'DELETE_LIKE.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Gagal Menghapus like pada Komentar karena data tidak lengkap'),
  'DELETED_LIKES.FAILED_TO_REMOVE_LIKES':new InvariantError('Gagal Menghapus like pada Komentar'),
  'DELETED_LIKES.NOT_CONTAIN_NEEDED_PROPERTY':new InvariantError('Gagal Menghapus like pada Komentar data tidak lengkap'),
  'DELETED_LIKES.NOT_MEET_DATA_TYPE_SPECIFICATION':new InvariantError('Gagal Menghapus like pada Komentar tipe data tidak sesuai'),
};

module.exports = DomainErrorTranslator;
