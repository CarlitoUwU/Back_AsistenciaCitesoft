exports.googleRedirect = (req, res) => {
  const token = req.user?.token
  if (token) {
    res.send(`
      <script>
        window.opener.postMessage(${JSON.stringify({ token })}, "*");
        window.close();
      </script>
    `)
  } else {
    res.send(`
      <script>
        window.opener.postMessage(${JSON.stringify({ error: 'error_authenticating' })}, "*");
        window.close();
      </script>
    `)
  }
}
