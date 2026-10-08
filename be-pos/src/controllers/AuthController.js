//bikin data dummy
const USERS = [
  {
    nama: "gilss",
    email: "agil@gmail.com",
    password: "12345678",
  }
]

export const login = (req, res) => {
  const {email, password} = req.body; //cara ngambil lewat destruct

  if(!email || !password) {
    res.status(400).json({
      //status angka depan 4, 5, 2
      //400 : bad responser (browser)
      //500 : server error (server/database)
      //200 : success
      status: false,
      message: "Email atau password required"})
  }
  //find()
  const user = USERS.find((u) => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Email atau password gagal",
    }) //401: unauthorized/login gagal
  }
  res.status(200).json ({
    status: true,
    message: `Welcome, ${user.nama}!!`,
    data: {
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
      },
      token: `jwt-token-123 ${user.id} - ${Date.now()}`
    }
  })
}