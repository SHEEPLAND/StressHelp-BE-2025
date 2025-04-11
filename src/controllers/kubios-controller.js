import 'dotenv/config';
import fetch from 'node-fetch';
import {customError} from '../middlewares/error-handler.js';
 
 // Kubios API base URL should be set in .env
 const baseUrl = process.env.KUBIOS_API_URI;
 
 /**
 * Get user data from Kubios API example
 * @async
 * @param {Request} req Request object including Kubios id token
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getUserData = async (req, res, next) => {
   const {kubiosIdToken} = req.user;
   const headers = new Headers();
   headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
   headers.append('Authorization', kubiosIdToken);
 
   try {
    const response = await fetch(
      baseUrl + '/result/self?from=2024-01-01T00%3A00%3A00%2B00%3A00',
      {
        method: 'GET',
        headers: headers,
      }
    );

    const results = await response.json();
    
    // Jos fetch ei onnistu, heitetään virhe
    if (!response.ok) {
      return next(customError('Failed to fetch user data from Kubios API', 500));
    }

    return res.json(results);
  } catch (error) {
    // Jos fetch tai muu virhe esiintyy
    return next(customError('Error fetching data from Kubios API: ' + error.message, 500));
  }
};
 
 /**
 * Get user info from Kubios API example
 * @async
 * @param {Request} req Request object including Kubios id token
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getUserInfo = async (req, res, next) => {
   const {kubiosIdToken} = req.user;
   const headers = new Headers();
   headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
   headers.append('Authorization', kubiosIdToken);
 
   try {
    const response = await fetch(baseUrl + '/user/self', {
      method: 'GET',
      headers: headers,
    });

    const userInfo = await response.json();

    // Jos fetch ei onnistu, heitetään virhe
    if (!response.ok) {
      return next(customError('Failed to fetch user info from Kubios API', 500));
    }

    return res.json(userInfo);
  } catch (error) {
    // Jos fetch tai muu virhe esiintyy
    return next(customError('Error fetching user info from Kubios API: ' + error.message, 500));
  }
};
 
 export {getUserData, getUserInfo};