import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
        state: {
            workspaces: [
                {
                    title: 'Workspace 1',
                    id: 1,
                    color: '#d29034',
                    userIds: [1, 2, 3]
                },
                {
                    title: 'Workspace 2',
                    id: 2,
                    color: '#055a8c',
                    userIds: 1
                },
                {
                    title: 'Workspace 3',
                    id: 3,
                    color: '#61bd4f',
                    userIds: [1, 2, 3, 4]
                }
            ],
            workspace: [
                {
                    workspacesIds: [1, 2],
                    id: 1
                },
                {
                    workspacesIds: [3, 4],
                    id: 2
                },
                {
                    workspacesIds: [5],
                    id: 3
                }
            ],
            columns: [
                {
                    title: 'Column 1',
                    workspaceIds: [1],
                    id: 1
                },
                {
                    title: 'Column 2',
                    workspaceIds: [2],
                    id: 2
                },
                {
                    title: 'Column 3',
                    workspaceIds: [3],
                    id: 3
                }
            ],
            items: [
                {
                    title: 'Item 1',
                    columnId: 1,
                    id: 1
                },
                {
                    title: 'Item 2',
                    columnId: 2,
                    id: 2
                },
                {
                    title: 'Item 3',
                    columnId: 3,
                    id: 3
                }
            ]
        },
        getters: {
            // functions to return the state if dynamic
            filterItems: (state) => (column) => {
                const columnId = column
                const items = state.items

                return items.filter(item => columnId.includes(item.columnId))
            }
        },
        mutations: {
            // functions to mutate the state
            addColumn (state, payload) {
                state.columns.push(payload)
            },
            addItem (state, payload) {
                state.items.push(payload)
            }
        },
        actions: {
            // functions that commit mutations, these can contain async code
        }
    })
