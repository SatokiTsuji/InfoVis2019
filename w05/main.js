function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 10 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var v = [];
    var f = [];

    var vertices = [
        [1, 1, -1], // v0
        [1, -1, -1], // v1
        [1, -1, 1], // v2
        [1, 1, 1],
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, 1],
        [-1, 1, -1]
    ];
    
    var faces = [
        [3, 1, 0], // f0: v0-v1-v2
        [3, 2, 1],
	    [0, 6, 3],
	    [0, 7, 6],
	    [4, 0, 1],
	    [4, 7, 0],
	    [6, 2, 3],
	    [6, 5, 2],
	    [2, 4, 1],
	    [2, 5, 4],
	    [6, 4, 5],
	    [6, 7, 4]
    ];

    for( var i = 0; i <= 7; i++ ){	
	v[i] = new THREE.Vector3().fromArray( vertices[i] );
    }
    for( var i = 0; i <= 11; i++ ){	
	var id = faces[i];
	f[i] = new THREE.Face3( id[0], id[1], id[2] );
    }
    
    var geometry = new THREE.Geometry();
    
    for( var i = 0; i <= 7; i++ ){
	geometry.vertices.push( v[i] );
    }
    for( var i = 0; i <= 11; i++ ){
	geometry.faces.push( f[i] );
    }
    
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    for( var i = 0; i <= 11; i++ ){
	geometry.faces[i].color = new THREE.Color( 1, 0, 0 );
    }


    
    document.addEventListener( 'mousedown', mouse_down_event );
    function mouse_down_event( event )
    {
        var x_win = event.clientX;
        var y_win = event.clientY;

        var vx = renderer.domElement.offsetLeft;
        var vy = renderer.domElement.offsetTop;
        var vw = renderer.domElement.width;
        var vh = renderer.domElement.height;
    
        var x_NDC = 2 * ( x_win - vx ) / vw - 1;
        var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
        
        var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
        var p_wld = p_NDC.unproject( camera );

        var origin = camera.position;
        var direction = p_wld.sub(camera.position).normalize();

        var raycaster = new THREE.Raycaster( origin, direction );
        var intersects = raycaster.intersectObject( cube );

        if ( intersects.length > 0 )
        {
            intersects[0].face.color.setRGB( 0, 1, 0 );
            intersects[0].object.geometry.colorsNeedUpdate = true;
        }
    }
    

    
    /*
    geometry.computeFaceNormals();
    material.side = THREE.DoubleSide;
    */

    /*
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.VertexColors;
    geometry.faces[0].vertexColors.push(new THREE.Color(1,0,0));
    geometry.faces[0].vertexColors.push(new THREE.Color(0,1,0));
    geometry.faces[0].vertexColors.push(new THREE.Color(0,0,1));
    */

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.008;

        renderer.render( scene, camera );
    }
}
