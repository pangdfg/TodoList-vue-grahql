
<template>
<div className="navbar bg-neutral shadow-black">
  <div className="flex-1">
    <RouterLink :to="{ name: 'todo-view' }">
    <a className="btn btn-ghost text-xl">To do List</a>
    </RouterLink>
  </div>
  <div className="flex-none gap-2">
    <div className="flex-none">
  </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-40 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li ><RouterLink :to="{ name: 'home' }"><a>Logout</a></RouterLink></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>
