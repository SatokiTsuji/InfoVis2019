// Constructor
Vec3 = function( x, y, z )
{
this.x = x;
this.y = y;
this.z = z;

}

Vec3.prototype.add = function( v )
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}
// Sum method
Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function()
{
    var min = this.x;
    if(this.y < min)
    {
	min = this.y;
    }
    if(this.z < min)
    {
	min = this.z;
    }
    return min;
}
// Max method
Vec3.prototype.max = function()
{
    var max = this.x;
    if(this.y > max)
    {
	max = this.y;
    }
    if(this.z > max)
    {
	max = this.z;
    }
    return max;
}
// Mid method
Vec3.prototype.mid = function()
{
    if(this.x >= this.y)
    {
	if(this.y >= this.z)
	{
	    return this.y;
	}
	else if(this.x <= this.z)
	{
	    return this.x;
	}
	else return this.z;
    }
    else if(this.x > this.z)
    {
	return this.x;
    }
    else if(this.y > this.z)
    {
	return this.z;
    }
    else return this.y;
}
