import { useState, useContext } from 'react';
import { ShortUrlContext } from './ShortUrlContext';

function HomePage() {
  const { shortUrl } = useContext(ShortUrlContext);
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleGenerateQRCode = async () => {
    if (!shortUrl) {
      setError('No short URL available to generate QR code.');
      return;
    }

    try {
      // Extract the URL code from the short URL
      const urlCode = shortUrl.split('/').pop();

      // Fetch the QR code from the backend
      const response = await fetch(`http://localhost:3000/qrcode/${urlCode}`);
      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setError('');
      } else {
        setError(data.error || 'Failed to generate QR code.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError('An error occurred while generating QR code.');
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to QR Code Generator</h1>
          <p className="lead">Easily create and manage your QR codes with our user-friendly tool.</p>
          <button
            className="btn btn-light btn-lg mt-3"
            onClick={handleGenerateQRCode}
          >
            Generate QR Code
          </button>
        </div>
      </section>

      {/* QR Code Display */}
      {qrCode && (
        <section className="qr-code py-5 text-center">
          <div className="container">
            <h2 className="mb-4">Your QR Code</h2>
            <img src={qrCode} alt="QR Code" />
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <section className="error py-3 text-center">
          <div className="container">
            <div className="alert alert-danger">
              {error}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-4">Features</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Easy to Use</h5>
                  <p className="card-text">Generate QR codes in just a few clicks with our intuitive interface.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">High Quality</h5>
                  <p className="card-text">Our QR codes are of the highest quality, ensuring they work seamlessly across all devices.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Customizable</h5>
                  <p className="card-text">Customize your QR codes with various colors and styles to suit your needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} QR Code Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
