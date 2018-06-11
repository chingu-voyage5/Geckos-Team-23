import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () => {
    return new Vue.Store({
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
            column: [
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
                },
                {
                    title: 'Column 4',
                    workspaceIds: [4],
                    id: 4
                },
                {
                    title: 'Column 5',
                    workspaceIds: [5],
                    id: 5
                }
            ]
        },
        getters: {
            // functions to return the state if dynamic
            showWorkspaces: state => {
                return state.workspaces
            },
            showWorkspace: state => {
                return state.workspace
            }
        },
        mutations: {
            // functions to mutate the state
        },
        actions: {
            // functions that commit mutations, these can contain async code
        }
    })
}

export default createStore
