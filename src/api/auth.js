export const login = (email, password) =>
  new Promise((resolve, reject) => {
    if (email === "homer@springfield.com" && password === "donuts") {
      resolve({ name: "Homer Simpson", userId: "HMSP01", role: "USER" });
    } else if (email === "admin@upgrad.com" && password === "admin") {
      resolve({ name: "Admin", userId: "ADMIN01", role: "ADMIN" });
    } else {
      reject("Incorrect email or password...");
    }
  });