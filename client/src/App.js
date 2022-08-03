import React from "react";
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HandleRoutes from "./routes/Routes"
import BlogState from "./BlogsCrud/BlogState";
import UserState from "./UsersCrud/UserState";

function App() {
  return (
    <div className="App">
      <UserState>
        <BlogState>
          <HandleRoutes />
        </BlogState>
      </UserState>
    </div>
  );
}

export default App;
