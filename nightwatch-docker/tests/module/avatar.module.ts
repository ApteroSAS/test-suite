

export function avatarLookAtObject(browser, classname){
    browser.execute(function (classname) {
        // @ts-ignore
        const IDENTITY = new THREE.Matrix4().identity();
        function setMatrixWorld(object3D, m) {
            if (!object3D.matrixIsModified) {
                object3D.applyMatrix4(IDENTITY); // hack around our matrix optimizations
            }
            object3D.matrixWorld.copy(m);
            if (object3D.parent) {
                object3D.parent.updateMatrices();
                object3D.matrix = object3D.matrix
                    .copy(object3D.parent.matrixWorld)
                    .invert()
                    .multiply(object3D.matrixWorld);
            } else {
                object3D.matrix.copy(object3D.matrixWorld);
            }
            object3D.matrix.decompose(object3D.position, object3D.quaternion, object3D.scale);
            object3D.childrenNeedMatrixWorldUpdate = true;
        }

        const childMatch = (function() {
            // @ts-ignore
            const inverseParentWorld = new THREE.Matrix4();
            // @ts-ignore
            const childRelativeToParent = new THREE.Matrix4();
            // @ts-ignore
            const childInverse = new THREE.Matrix4();
            // @ts-ignore
            const newParentMatrix = new THREE.Matrix4();
            // transform the parent such that its child matches the target
            return function childMatch(parent, child, target) {
                parent.updateMatrices();
                inverseParentWorld.copy(parent.matrixWorld).invert();
                child.updateMatrices();
                childRelativeToParent.multiplyMatrices(inverseParentWorld, child.matrixWorld);
                childInverse.copy(childRelativeToParent).invert();
                newParentMatrix.multiplyMatrices(target, childInverse);
                setMatrixWorld(parent, newParentMatrix);
            };
        })();

        let elements:any = document.getElementsByClassName(classname);
        const len = elements.length;
        if(len!=1){
            console.warn("invalid length for avatarLookAtObject");
        }

        // @ts-ignore
        const characterController = AFRAME.scenes[0].systems["hubs-systems"].characterController;
        const avatar = characterController.avatarPOV.object3D;
        avatar.updateMatrices();
        for(let i =0 ;i<len;i++){
            console.log("ici",elements[i]);
            if(elements[i].object3D){
                // @ts-ignore
                let up = new THREE.Vector3(0,1,0);
                // @ts-ignore
                let obp = new THREE.Vector3();
                elements[i].object3D.localToWorld(obp);
                //obp.multiplyScalar(-1)//TODO verify
                //avatar.worldToLocal(obp)
                //avatar.lookAt(obp);

                // @ts-ignore
                const inMat4Copy = new THREE.Matrix4();
                // @ts-ignore
                const startRotation = new THREE.Matrix4();
                // @ts-ignore
                const endRotation = new THREE.Matrix4();
                // @ts-ignore
                const v = new THREE.Vector3();
                // @ts-ignore
                const newPOV = new THREE.Matrix4();
                inMat4Copy.copy(avatar.matrixWorld);
                newPOV
                    .copy(startRotation.extractRotation(inMat4Copy))
                    .scale(v.setFromMatrixScale(inMat4Copy))
                    .setPosition(v.setFromMatrixPosition(inMat4Copy));

                newPOV.lookAt(v.setFromMatrixPosition(inMat4Copy),obp,up)
                childMatch(characterController.avatarRig.object3D, characterController.avatarPOV.object3D, newPOV);
                return "lookAt"
            }
        }
        return "invalid lookat"
    }, [classname], function(result) {
        console.log(result.value);
    });
}

/*


            browser.execute(function(data) {
                //TODO check the state of the mixin annimation
                //AFRAME.scenes[0].camera.lookAt(0,0,0);
                return window.navigator.userAgent;

            }, [], function(result) {
                console.log(result.value);
            });
            browser.executeAsync(function(done) {
                setTimeout(function() {
                    done(true);
                }, 500);
            }, [], function(result) {
                // result.value === true
            });
 */