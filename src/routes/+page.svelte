<script>
  import Router from "svelte-spa-router";
  import Nav from "../components/nav.svelte";
  import Home from "./home.svelte";
  import TrainLocation from "./trainLocation.svelte";
  import TrainSchedule from "./trainSchedule.svelte";
  import FindTrain from "./findTrain.svelte";


const routes = {
    "/": Home,
    "/findTrain": FindTrain,
    "/trainLocation": TrainLocation,
    "/trainSchedule": TrainSchedule
  }


</script>

<main>
  <Nav />
  <Router {routes} />
</main>

<style>

  main {
    margin-top: 10%;
  }
</style>