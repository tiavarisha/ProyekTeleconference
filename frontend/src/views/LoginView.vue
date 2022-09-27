<template>
    <nav class="navbar justify-content-end">
        <img src="/SCOOPE 01.jpg" class="img-fluid border rounded-pill mt-2 me-3">
    </nav>
    <div class="container" id="login">
        <div class="login mt-4 p-4 mx-auto border rounded bg-white">
          <h3 class="mb-3 text-center fw-bold">LOGIN</h3>
          <form>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" id="password">
            </div>
            <RouterLink to="/landingpage">
              <button type="submit" class="btn-login btn btn-primary">LOGIN</button>
            </RouterLink>
          </form>
      </div>
    </div>
</template>
  
  <style>
  img{
    max-height: 100px;
  }
  #login{
    max-width: 400px;
  }
  .btn-login{
    width: 100%;
  }
  </style>