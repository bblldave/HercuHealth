import { useState, useEffect } from "react";
import { PassageUser } from '@passageidentity/passage-elements/passage-user';

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
  });

  useEffect(() => {
    let cancelRequest = false;
    try {
      new PassageUser().authGuard().then(res => {
        if (cancelRequest) {
          return;
        }
        if (res === false) {
          setResult({
            isLoading: false,
            isAuthorized: false,
          });
          return;
        }
        setResult({
          isLoading: false,
          isAuthorized: true,
        });
      });
    } catch (error) {
      setResult({
        isLoading: false,
        isAuthorized: false,
      })
    }
   
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}

