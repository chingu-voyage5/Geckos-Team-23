<template>
  <div class="item" v-bind:id="id">
    <div class="item__header" v-bind:style="{ background: color}">

			<i class="fas fa-circle drag-btn" v-on:mousedown="dragStart($event)"></i>

      <slot></slot>

      <div class="dropdown-menu">
        <button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
        <div class="dropdown">
          <span class="dropdown__arrow"></span>
          <div class="dropdown__body">
            <button v-on:click="deleteItem($event)"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>

    </div><!-- end of item__header -->

    <div class="item__body">
      <div class="text-item-content">
        <textarea class="styled-textarea" placeholder="Write some notes here..." v-model="itemContent" v-on:keyup="saveItem" v-bind:style="{ height: textAreaHeight }">
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import db from '../components/firebaseInit'

  export default {
    props: [
      'title',
      'color',
      'id',
      'content',
      'height'
    ],
    data () {
      return {
        routeId: this.$route.params.id,
        workspace: {},
        itemContent: '',
        textAreaHeight: '20px'
      }
    },
    created () {
      const workspacesRef = db.collection('workspaces')

      // Load open workspace data
      workspacesRef.doc(this.routeId).onSnapshot((workspace) => {
        const data = {
          'title': workspace.data().title,
          'color': workspace.data().color,
          'columns': workspace.data().columns,
          'userIDs': workspace.data().userIDs
        }
        this.workspace = data
      })

      // pass read-only value of content prop into live itemContent
      this.itemContent = this.content
      this.textAreaHeight = this.height
    },
    methods: {
      dragStart (event) {
        const item = event.target.parentNode.parentNode
        const column = item.parentNode.parentNode
        const columnItems = column.querySelectorAll('.item')
        const itemIndex = Array.prototype.indexOf.call(columnItems, item)
        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)

				// (2) prepare to moving: make absolute and on top by z-index
			  item.style.position = 'absolute'
			  item.style.zIndex = 1000
			  // move it out of any current parents directly into body
			  // to make it positioned relative to the body
			  document.body.append(item)
			  // ...and put that absolutely positioned item under the cursor

			  moveAt(event.pageX, event.pageY)

			  // centers the item at (pageX, pageY) coordinates
			  function moveAt(pageX, pageY) {
					// center item with cursor
			    // item.style.left = pageX - item.offsetWidth / 2 + 'px'
			    // item.style.top = pageY - item.offsetHeight / 2 + 'px'
					item.style.left = (pageX - 20) + 'px'
			    item.style.top = (pageY - 20) + 'px'
			  }

				let currentDroppable = null; // potential droppable that we're flying over right now

			  function onMouseMove(event) {
					moveAt(event.pageX, event.pageY)

				  item.hidden = true;
				  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
				  item.hidden = false;

				  // mousemove events may trigger out of the window (when the item is dragged off-screen)
				  // if clientX/clientY are out of the window, then elementfromPoint returns null
				  if (!elemBelow) return

				  // potential droppables are labeled with the class "droppable" (can be other logic)
				  let droppableBelow = elemBelow.closest('.droppable')

				  if (currentDroppable != droppableBelow) { // if there are any changes
				    // we're flying in or out...
				    // note: both values can be null
				    //   currentDroppable=null if we were not over a droppable (e.g over an empty space)
				    //   droppableBelow=null if we're not over a droppable now, during this event

				    if (currentDroppable) {
				      // the logic to process "flying out" of the droppable (remove highlight)
				      leaveDroppable(currentDroppable);
				    }
				    currentDroppable = droppableBelow;
				    if (currentDroppable) {
				      // the logic to process "flying in" of the droppable
				      enterDroppable(currentDroppable);
				    }
				  }
			  }

			  // (3) move the item on mousemove
			  document.addEventListener('mousemove', onMouseMove)

			  // (4) drop the item, remove unneeded handlers
			  item.onmouseup = function() {
			    document.removeEventListener('mousemove', onMouseMove)
			    item.onmouseup = null;
			  };

				item.ondragstart = function() {
				  return false
				};

        console.log( columnIndex )
        this.$emit('dragging', item)
      },

      saveWorkspace () {
        db.collection('workspaces').doc(this.$route.params.id).set(this.workspace)
      },
      saveItem (event) {
        const column = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        const columnItems = column.querySelectorAll('.item')
        const item = event.target.parentNode.parentNode.parentNode
        const itemIndex = Array.prototype.indexOf.call(columnItems, item)

        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)

        // Save data
        this.workspace.columns[columnIndex].items[itemIndex].content = this.itemContent
        this.textAreaHeight = event.target.style.height
        this.workspace.columns[columnIndex].items[itemIndex].height = this.textAreaHeight
        console.log(this.textAreaHeight)
        this.saveWorkspace()
      },
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
      deleteItem (event) {
        const item = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        const columnItems = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes

        const column = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)

        const allMenus = document.querySelectorAll('.dropdown')
        const itemIndex = Array.prototype.indexOf.call(columnItems, item)

        this.workspace.columns[columnIndex].items.splice(itemIndex, 1)

        // close all open menus
        for (let i = 0; i < allMenus.length; i++) {
          allMenus[i].classList.remove('visible')
        }

        // Save workspace snapshot to DB
        this.saveWorkspace()
      }
    }
  }
</script>
<style lang="scss">

  .styled-textarea {
    width: 100%;
    min-height: 30px;
    border: 0px;
    outline: none;
    resize: vertical;
  }

	.drag-btn {
		cursor: grab;
	}

</style>
