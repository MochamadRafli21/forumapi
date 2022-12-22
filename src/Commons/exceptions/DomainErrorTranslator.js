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
  'VERIFIED_COMMENT.OWNER_NOT_MATCH': new AuthorizationError('Tidak dapat menghapus comment, anda tidak memiliki hak akses'),
  'DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat Menghapus comment karena data tidak lengkap')
};

module.exports = DomainErrorTranslator;
