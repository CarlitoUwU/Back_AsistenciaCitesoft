exports.googleRedirect = (req, res) => {
  const token = req.user?.token
  if (!token) {
    return res.send(`<script>
      window.opener.postMessage({ error: 'auth_failed' }, '${process.env.FRONTEND_URL}');
      window.close();
    </script>`)
  }

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 1000
  })

  // Enviar mensaje a la ventana que abrió el popup y cerrar la ventana
  res.send(`<script>
    window.opener.postMessage({ success: true }, '${process.env.FRONTEND_URL}');
    window.close();
  </script>`)
}
