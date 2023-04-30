export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  // if (email in db)
  if (!email) return "Email không thể để trống!"
  if (!re.test(email)) return 'Email không hợp lệ!'
  return ''
}
