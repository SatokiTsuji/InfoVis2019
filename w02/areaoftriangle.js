var script = document.createElement('script');
script.type = 'text/javascript';
script.src = './Work/InfoVis2019/W02/vec3.js';

Triangle = function(v0,v1,v2)
{
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
}

Triangle.prototype.area = function()
{
    var a = [this.v2[0] - this.v0[0], this.v2[1] - this.v0[1], this.v2[2] - this.v0[2]];
    var b = [this.v1[0] - this.v0[0], this.v1[1] - this.v0[1], this.v1[2] - this.v0[2]];
    var S = (Math.sqrt((a[1] * b[2] - a[2] * b[1])**2+(a[2] * b[0] - a[0] * b[2])**2+(a[0] * b[1] - a[1] * b[0])**2))/2
    return S;
}
