export const login = (email, password) =>
  new Promise((resolve, reject) => {
    if (email === "homer@springfield.com" && password === "donuts") {
      resolve({ name: "Homer Simpson", userId: "HMSP01" });
    } else {
      reject("Incorrect email or password...");
    }
  });