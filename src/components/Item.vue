<template>
  <div class="item">
    <div class="item__header" v-bind:style="{ background: color}">

    	<h3><slot>{{title}}</slot></h3>

			<div class="dropdown-menu">
				<button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
				<div class="dropdown">
					<i class="fas fa-caret-up dropdown__arrow"></i>
					<div class="dropdown__body">
						<button v-on:click="deleteItem($event)"><i class="fas fa-trash"></i> Delete</button>
					</div>
				</div>
			</div>

    </div><!-- end of item__header -->

    <div class="item__body">
      <div class="item__button" v-bind:style="{ background: color}">
        <i class="fas fa-plus item__icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'title',
      'color'
    ],
		methods: {
			toggleDropDown (event) {
        const dropDownMenu = event.target.nextElementSibling
        const allMenus = document.querySelectorAll('.dropdown')
        const clickedMenu = Array.prototype.indexOf.call(allMenus, dropDownMenu)

        // close all open menus except clicked one
        for (let i = 0; i < allMenus.length; i++) {
          if (allMenus[i] !== allMenus[clickedMenu]) {
            allMenus[i].classList.remove('visible')
          }
        }

        // open clicked menu
        dropDownMenu.classList.toggle('visible')
      },
		}
  }
</script>
