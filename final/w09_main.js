function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.5,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    // initialization
    var isovalue = 128;
    var colors = 128;
    var shader = 0;

    var surfaces = Isosurfaces( volume, isovalue, colors, shader );
    screen.scene.add( surfaces );

    // color change
    var button = document.getElementById("change-colors-button");
    button.addEventListener("click", function(e) {
        e.preventDefault();
        colors = document.getElementById("colors").value;
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, isovalue, colors, shader );
        screen.scene.add( surfaces );
    });

    // isovalue change
    var button = document.getElementById("change-isovalue-button");
    button.addEventListener("click", function(e) {
        e.preventDefault();
        isovalue = document.getElementById("isovalue").value;
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, isovalue, colors, shader );
        screen.scene.add( surfaces );
    });

    // shader change
    var button = document.getElementById("phong");
    button.addEventListener("click", function(e) {
        e.preventDefault();
        shader = 0;
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, isovalue, colors, shader );
        screen.scene.add( surfaces );
    });
    var button = document.getElementById("gouraud");
    button.addEventListener("click", function(e) {
        e.preventDefault();
        shader = 1;
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, isovalue, colors, shader );
        screen.scene.add( surfaces );
    });

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth *0.5, window.innerHeight ] );
    });

    screen.loop();
}
