<template>
    <div>
        <!-- Navbar -->
        <div>
            <nav>
                <ul class="navbar">
                    <li>
                        <router-link to="/" class="nav-link"
                            >Dashboard</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/management" class="nav-link"
                            >Management Data</router-link
                        >
                    </li>
                </ul>
            </nav>
        </div>

        <div>
            <div class="filter-section" style="margin-top: 50px">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search"
                    class="filter-input"
                />

                <select v-model="selectedGender" class="gender-filter">
                    <option value="">All Gender</option>
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                </select>

                <button @click="openAddModal" class="btn-add">Add</button>
            </div>

            <!-- Table -->
            <table class="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in filteredUsers" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.gender }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>{{ user.updated_at }}</td>
                        <td class="action-buttons">
                            <button @click="viewUser(user.id)" class="btn-read">
                                Read
                            </button>
                            <button @click="editUser(user.id)" class="btn-edit">
                                Edit
                            </button>
                            <button
                                @click="deleteUser(user.id)"
                                class="btn-delete"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add Modal -->
        <div v-if="isModalOpen" class="modal">
            <div class="modal-content">
                <span @click="closeModal" class="close-btn">&times;</span>
                <h3>Add New User</h3>
                <form @submit.prevent="createUser">
                    <div class="form-item">
                        <label for="name">Name:</label>
                        <input
                            type="text"
                            v-model="formData.name"
                            id="name"
                            required
                        />
                    </div>

                    <div class="form-item">
                        <label for="gender">Gender:</label>
                        <select v-model="formData.gender" id="gender" required>
                            <option value="" disabled>Select Gender</option>
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                        </select>
                    </div>

                    <div class="button-container">
                        <button type="submit">Add User</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View Modal -->
        <div v-if="isModalOpenView" class="modal">
            <div class="modal-content">
                <span @click="closeModalRead" class="close-btn">&times;</span>
                <h3>Read User</h3>
                <form>
                    <div class="form-item">
                        <label for="name">Name:</label>
                        <input
                            type="text"
                            v-model="selectedUser.name"
                            id="name"
                            disabled
                        />
                    </div>

                    <div class="form-item">
                        <label for="gender">Gender:</label>
                        <input
                            type="text"
                            v-model="selectedUser.gender"
                            disabled
                        />
                    </div>

                    <div class="form-item">
                        <label for="date">Created At:</label>
                        <input
                            type="text"
                            v-model="selectedUser.created_at"
                            disabled
                        />
                    </div>
                    <div class="form-item">
                        <label for="date">Updated At</label>
                        <input
                            type="text"
                            v-model="selectedUser.updated_at"
                            disabled
                        />
                    </div>
                </form>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="isModalOpenEdit" class="modal">
            <div class="modal-content">
                <span @click="closeModalEdit" class="close-btn">&times;</span>
                <h3>Edit User</h3>
                <form @submit.prevent="updateUser">
                    <div class="form-item">
                        <label for="name">Name:</label>
                        <input
                            type="text"
                            v-model="selectedUser.name"
                            id="name"
                            required
                        />
                    </div>

                    <div class="form-item">
                        <label for="gender">Gender:</label>
                        <select
                            v-model="selectedUser.gender"
                            id="gender"
                            required
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                        </select>
                    </div>

                    <div class="button-container">
                        <button type="submit">Update User</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="isModalOpenDelete" class="modal">
            <div class="modal-content">
                <span @click="closeModalDelete" class="close-btn">&times;</span>
                <h3>Delete User</h3>
                <p style="margin-top: 13px">
                    Are you sure you want to delete this user?
                </p>
                <div class="button-container">
                    <button @click="deleteUserConfirm">Delete</button>
                    <button @click="closeModalDelete">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataManagement from "../js/management";
export default {
    name: "Management",
    mixins: [DataManagement],
};
</script>
