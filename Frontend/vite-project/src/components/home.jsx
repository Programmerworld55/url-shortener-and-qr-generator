import { useState} from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useContext } from 'react';
// import { ShortUrlContext } from './ShortUrlContext';
import { ShortUrlContext } from './ShortUrlContext';


function HomePage() {
const { shortUrl, setShortUrl } = useContext(ShortUrlContext);
// const{UrlData,SeturlData}=useContext(ShortUrlContext)


  const [url, setUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
  const [notifications, setNotifications] = useState([]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
        console.log("url is not correct",error)
      return false;
    }
  };
  

  const handleGenerateShortUrl = async (e) => {
    
    
    e.preventDefault(); 
    setNotifications([]); 

    if (!url) {
      addNotification('error', 'Please enter a URL first.');
      return;
    }
    if (!isValidUrl(url)) {
        addNotification('error', 'Please enter a valid URL.');
        return;
      }

    try {
      const response = await fetch("http://localhost:3000/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }), 
      });

      if (response.ok) {
        const data = await response.json();

        if (data.message === "URL already exists!") {
          setShortUrl(data.data.shortUrl);
          console.log("message is:", data.message);
        } else {
          setShortUrl(data.data.shortUrl);
          console.log("message is:", data.message);
        addNotification('success', 'Short URL generated successfully!');

        }

      } else {
        addNotification('error', 'Failed to generate short URL.');
      }
    } catch (error) {
      console.error("Error occurred while generating link:", error);
      addNotification('error', 'An error occurred while generating the URL. Please try again.');
    }
  };

  const addNotification = (type, message) => {
    const id = new Date().getTime(); 
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 3000); 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">QR Code Generator</h1>

          <form onSubmit={handleGenerateShortUrl}>
            <div className="mb-4">
              <label htmlFor="urlInput" className="form-label">Enter URL</label>
              <input
                type="text"
                id="urlInput"
                className="form-control"
                placeholder="Enter your URL here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {notifications.map(({ id, type, message }) => (
              <div key={id} className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 me-2"
              >
                Generate Short URL
              </button>
            </div>
          </form>

          {shortUrl && (
            <div className="mb-4">
              <label htmlFor="shortUrl" className="form-label">Short URL</label>
              <div className="input-group">
                <input
                  type="text"
                  id="shortUrl"
                  className="form-control"
                  readOnly
                  value={shortUrl}
                />
                <CopyToClipboard text={shortUrl}>
  <button
    className="btn btn-outline-secondary"
    type="button"
    onClick={() => {
      addNotification('info', 'Short URL copied to clipboard!');
      setShortUrl('');
    }}
  >
    Copy
  </button>
</CopyToClipboard>

              </div>
            </div>
          )}

          <div className="text-center">
            <Link to="/qrcode" className="btn btn-success btn-lg">
              Go to QR Code Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
