<script>
    import Router, {push} from "svelte-spa-router"
</script>
  
  <nav>
    <ul>
        <li><a href="/#/">Koti</a></li>
        <li><a href="/#/findTrain">Etsi Juna</a></li>
        <li><a href="/#/trainLocation">Etsi junan sijainti</a></li>
        <li><a href="/#/trainSchedule">Etsi aikataulu</a></li>
    </ul>
  </nav>
  
  <style>
    nav {
      background-color: #333;
      padding: 10px 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
    }
  
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      margin: 0;
      display: flex;
      align-items: center;
      height: 40px;
    }
  
    li {
      margin-right: 20px;
    }
  
    a {
      text-decoration: none;
      font-size: 16px;
      color: white;
      transition: color 0.3s ease-in-out;
    }
  
    a:hover {
      color: #007bff;
    }
  </style>