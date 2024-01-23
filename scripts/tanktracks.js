class tanktracks {
    constructor(){
        this.tracks = [];
    }
    addTrack(trackMesh){
        this.tracks.push(trackMesh)
    }
    static skew(skeleton,mesh,scene){
        return;
        tanktracks.skeletonViewer = new BABYLON.Debug.SkeletonViewer(skeleton, mesh, scene);
        tanktracks.skeletonViewer.color = BABYLON.Color3.Red();
        tanktracks.skeletonViewer.isEnabled = true;
    }
    static toggleSkeletonView(){
        tanktracks.skeletonViewer.isEnabled = !tanktracks.skeletonViewer.isEnabled;
    }
    updateBefore(){

    }
    updateAfter(){
        
    }
}
let chainCollisionMargin=0.05; //added to make the chain visible during collision with the bumps
const wheelMeshesLeft = new Array(7);
const wheelMeshesRight = new Array(7);
let bones = null;
let skeleton = null;
let susl = null;
let susr = null;