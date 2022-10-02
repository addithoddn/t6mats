import MATERIAL from "../constants/Materials";

const idsHelper = Object.freeze({
    t6Ids: () => {
        const ids = Object.values(MATERIAL.T6).map( mat => mat.ID);
        return ids;
    }
});

export default idsHelper;