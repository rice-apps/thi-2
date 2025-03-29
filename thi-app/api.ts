const BASE_URL = "http://localhost:3000/api";

const fetchData = async (
    endpoint: RequestInfo,
    method = "GET",
    body = null,
    headers = {}
) => {
    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        }).then((response) => response.json());

        if (response.isError) {
            throw new Error(
                `Error ${response.statusCode}: ${response.message}`
            );
        }

        return response.data;
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};

export const authAPI = {
    signIn: (body: undefined) =>
        fetchData(`${BASE_URL}/auth/login`, "POST", body),
    signUp: (body: undefined) =>
        fetchData(`${BASE_URL}/auth/register`, "POST", body),
    changePassword: (body: undefined) =>
        fetchData(`${BASE_URL}/auth/change-password`, "POST", body),
};

export const durationAPI = {
    createDuration: (body: undefined) =>
        fetchData(`${BASE_URL}/duration/create`, "POST", body),
    updateDuration: (body: undefined, student_id: undefined) =>
        fetchData(`${BASE_URL}/duration/${student_id}`, "PUT", body),
    deleteDuration: (body: undefined, student_id: undefined) =>
        fetchData(`${BASE_URL}/duration/${student_id}`, "DELETE", body),
    getAllDuration: () => fetchData(`${BASE_URL}/duration/all`, "GET"),
    getAllDurationByStaffId: (staff_id: undefined) =>
        fetchData(`${BASE_URL}/duration/staff/${staff_id}`, "GET"),
    getAllDurationByStudentID: (student_id: undefined) =>
        fetchData(`${BASE_URL}/duration/${student_id}`, "GET"),
};

export const studentAPI = {
    createStudent: (body: undefined) =>
        fetchData(`${BASE_URL}/student/create`, "POST", body),
    updateStudent: (body: undefined, student_id: undefined) =>
        fetchData(`${BASE_URL}/student/${student_id}`, "PUT", body),
    deleteStudent: (student_id: undefined) =>
        fetchData(`${BASE_URL}/student/${student_id}`, "DELETE"),
    getStudent: (student_id: undefined) =>
        fetchData(`${BASE_URL}/student/${student_id}`, "GET"),
};

export const adminAPI = {
    whitelistAccount: (body: undefined) =>
        fetchData(`${BASE_URL}/admin/whitelist`, "POST", body),
    deleteAccount: (body: undefined) =>
        fetchData(`${BASE_URL}/admin/delete`, "DELETE", body),
    getAllAbcData: () => fetchData(`${BASE_URL}/admin/findAllAbc`, "GET"),
    getAllDurationData: () =>
        fetchData(`${BASE_URL}/admin/findAllDuration`, "GET"),
};

export const abcAPI = {
    createAbc: (body: undefined) =>
        fetchData(`${BASE_URL}/abc/create`, "POST", body),
    getAbcByAccount: () => fetchData(`${BASE_URL}/abc/getRecords`, "POST"),
    createAbcById: (body: undefined, abc_id: undefined) =>
        fetchData(`${BASE_URL}/abc/${abc_id}`, "POST", body),
    updateAbcById: (abc_id: undefined) =>
        fetchData(`${BASE_URL}/abc/${abc_id}`, "PUT"),
    deleteAbcById: (abc_id: undefined) =>
        fetchData(`${BASE_URL}/abc/${abc_id}`, "DELETE"),
    exportAllAbc: () => fetchData(`${BASE_URL}/abc/export`, "GET"),
    getAbcByStaffId: (staff_id: undefined) =>
        fetchData(`${BASE_URL}/abc/records/staff/${staff_id}`, "GET"),
    getAbcByStudentId: (student_id: undefined) =>
        fetchData(`${BASE_URL}/abc/records/student/${student_id}`, "GET"),
};
