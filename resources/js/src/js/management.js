import axios from "axios";

export default {
    name: "DataManagement",
    data() {
        return {
            users: [],
            selectedUser: {},
            formData: {
                name: "",
                gender: "",
            },
            message: "",
            searchQuery: "",
            selectedGender: "",
            isModalOpen: false,
            isModalOpenView: false,
            isModalOpenEdit: false,
            isModalOpenDelete: false,
            newUser: {
                name: "",
                gender: "",
            },
        };
    },
    async created() {
        try {
            const response = await axios.get("http://localhost:8000/api/users");
            console.log("Response from API:", response.data); // Cek apa yang diterima dari API
            this.users = response.data;
        } catch (error) {
            console.error(error);
        }
    },
    computed: {
        filteredUsers() {
            const searchQueryLower = this.searchQuery.toLowerCase();

            const filtered = this.users.filter((user) => {
                const matchesGender =
                    this.selectedGender === "" ||
                    user.gender.toLowerCase() ===
                        this.selectedGender.toLowerCase();

                const matchesSearch = Object.values(user).some((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(searchQueryLower);
                    }
                    return false;
                });

                return matchesGender && matchesSearch;
            });

            const sortedByDate = filtered.sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            

            return sortedByDate;
        },
    },

    methods: {
        async createUser() {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/users",
                    this.formData
                );
                this.message = "User created successfully";
                this.users.push(response.data);
                this.resetForm();
            } catch (error) {
                this.message = "Failed to create user";
                console.log("Error creating user", error);
            }
        },
        resetForm() {
            this.formData = {
                name: "",
                gender: "",
            };
        },
        openAddModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        openViewModal() {
            this.isModalOpenView = true;
        },
        closeModalRead() {
            this.isModalOpenView = false;
        },
        viewUser(id) {
            this.selectedUser = this.users.find((user) => user.id === id);
            this.isModalOpenView = true;
        },
        closeModalRead() {
            this.isModalOpenView = false;
        },
        openEditModal() {
            this.selectedUser = JSON.parse(JSON.stringify(user));
            this.isModalOpenEdit = true;
        },
        editUser(id) {
            const user = this.users.find((user) => user.id === id);
            console.log("Selected user for editing:", user);
            if (user) {
                this.selectedUser = { ...user };
                this.isModalOpenEdit = true;
            } else {
                console.error("User not found");
            }
        },
        closeModalEdit() {
            this.isModalOpenEdit = false;
        },
        async updateUser() {
            if (!this.selectedUser.id) {
                this.message = "Invalid user ID";
                console.log("Invalid user ID");
                return;
            }

            try {
                const response = await axios.put(
                    `http://localhost:8000/api/users/${this.selectedUser.id}`,
                    this.selectedUser
                );

                const index = this.users.findIndex(
                    (user) => user.id === this.selectedUser.id
                );
                if (index !== -1) {
                    this.users.splice(index, 1, response.data);
                }

                this.isModalOpenEdit = false;
                this.message = "User updated successfully";
            } catch (error) {
                this.message = "Failed to update user";
                console.error("Error updating user", error);
            }
        },
        openDeleteModal() {
            this.isModalOpenDelete = true;
        },
        deleteUser(id) {
            this.selectedUser = this.users.find((user) => user.id === id);
            if (this.selectedUser) {
                this.isModalOpenDelete = true;
            } else {
                console.error("User not found");
            }
        },
        deleteUserConfirm() {
            this.users = this.users.filter(
                (user) => user.id !== this.selectedUser.id
            );
            this.isModalOpenDelete = false;
        },
        closeModalDelete() {
            this.isModalOpenDelete = false;
        },
        async deleteUser(id) {
            try {
                await axios.delete(`http://localhost:8000/api/users/${id}`);
                this.users = this.users.filter((user) => user.id !== id);

                const response = await axios.get(
                    "http://localhost:8000/api/users"
                )
                this.users = response.data
            } catch (error) {
                console.error("Error deleting user", error);
            }
        },
    },
};
