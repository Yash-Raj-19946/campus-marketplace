import { createContext, useState } from "react";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [hasRequests, setHasRequests] = useState(false);

  return (
    <RequestContext.Provider value={{ hasRequests, setHasRequests }}>
      {children}
    </RequestContext.Provider>
  );
};
