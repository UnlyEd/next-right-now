export default function redirect(res, statusCode, location) {
  if (!res) {
    throw new Error('Response object required');
  }

  if (!statusCode) {
    throw new Error('Status code required');
  }

  if (!location) {
    throw new Error('Location required');
  }

  res.statusCode = statusCode;
  res.setHeader('Location', location);
  res.end();
}
