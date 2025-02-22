export const getMaterialsStart = () => ({
    type: "GET_MATERIALS_START",
});

export const getMaterialsSuccess = (materials) => ({
    type: "GET_MATERIALS_SUCCESS",
    payload: materials,
});

export const getMaterialsFailure = () => ({
    type: "GET_MATERIALS_FAILURE",
});

export const deleteMaterialStart = () => ({
    type: "DELETE_MATERIAL_START",
});

export const deleteMaterialSuccess = (id) => ({
    type: "DELETE_MATERIAL_SUCCESS",
    payload: id,
});

export const deleteMaterialFailure = () => ({
    type: "DELETE_MATERIAL_FAILURE",
});


export const createMaterialStart = () => ({
    type: "CREATE_MATERIAL_START",
});

export const createMaterialSuccess = (material) => ({
    type: "CREATE_MATERIAL_SUCCESS",
    payload: material,
});

export const createMaterialFailure = () => ({
    type: "CREATE_MATERIAL_FAILURE",
});

export const updateMaterialStart = () => ({
    type: "UPDATE_MATERIAL_START",
});

export const updateMaterialSuccess = (material) => ({
    type: "UPDATE_MATERIAL_SUCCESS",
    payload: material,
});

export const updateMaterialFailure = () => ({
    type: "UPDATE_MATERIAL_FAILURE",
});

