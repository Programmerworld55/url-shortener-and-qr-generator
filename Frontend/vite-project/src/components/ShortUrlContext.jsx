import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ShortUrlContext = createContext();

export const ShortUrlProvider = ({ children }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [user, setUser] = useState({}); // New state for user

  return (
    <ShortUrlContext.Provider value={{ shortUrl, setShortUrl, user, setUser }}>
      {children}
    </ShortUrlContext.Provider>
  );
};

ShortUrlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
