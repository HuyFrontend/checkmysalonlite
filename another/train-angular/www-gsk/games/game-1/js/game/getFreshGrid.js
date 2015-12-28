NumberConnect.prototype.getFreshGrid = function()
{
	var grid = new Array(this.levelWidthTiles);

	for (i = 0; i < this.levelWidthTiles; ++i)
	{
		grid[i] = new Array(this.levelHeightTiles);

		for (j = 0; j < this.levelHeightTiles; ++j)
		{
			grid[i][j] = {
				'location': {'x': i, 'y': j},
				_connections: {'top': false, 'right': false, 'bottom': false, 'left': false},
				_connectionSegments: {'top': null, 'right': null, 'bottom': null, 'left': null},
				// 'displayTile': null,
				get topConnected() {return this._connections.top;},
				set topConnected(connected) {
					this._connections.top = connected;
					if (connected)
					{
						TGE.Game.GetInstance().makeSegment(this, 'top');
					}
					else if (!connected)
					{
						if (this._connectionSegments.top)
						{
							TGE.Game.GetInstance().pathSegments.removeNamedMember(this._connectionSegments.top);
							TGE.Game.GetInstance().stage.getChildByName(this._connectionSegments.top, false).markForRemoval();
							this._connectionSegments.top = null;
						}
					}
				},
				get rightConnected() {return this._connections.right;},
				set rightConnected(connected) {
					this._connections.right = connected;
					if (connected)
					{
						TGE.Game.GetInstance().makeSegment(this, 'right');
					}
					else if (!connected)
					{
						if (this._connectionSegments.right)
						{
							TGE.Game.GetInstance().pathSegments.removeNamedMember(this._connectionSegments.right);
							TGE.Game.GetInstance().stage.getChildByName(this._connectionSegments.right, false).markForRemoval();
							this._connectionSegments.right = null;
						}
					}
				},
				get bottomConnected() {return this._connections.bottom;},
				set bottomConnected(connected) {
					this._connections.bottom = connected;
					if (connected)
					{
						TGE.Game.GetInstance().makeSegment(this, 'bottom');
					}
					else if (!connected)
					{
						if (this._connectionSegments.bottom)
						{
							TGE.Game.GetInstance().pathSegments.removeNamedMember(this._connectionSegments.bottom);
							TGE.Game.GetInstance().stage.getChildByName(this._connectionSegments.bottom, false).markForRemoval();
							this._connectionSegments.bottom = null;
						}
					}
				},
				get leftConnected() {return this._connections.left;},
				set leftConnected(connected) {
					this._connections.left = connected;
					if (connected)
					{
						TGE.Game.GetInstance().makeSegment(this, 'left');
					}
					else if (!connected)
					{
						if (this._connectionSegments.left)
						{
							TGE.Game.GetInstance().pathSegments.removeNamedMember(this._connectionSegments.left);
							TGE.Game.GetInstance().stage.getChildByName(this._connectionSegments.left, false).markForRemoval();
							this._connectionSegments.left = null;
						}
					}
				},
				'numberPath': -1,
				'isNumberEndpoint': false
			};
		}
	}

	for (var key in this.dictNumberTilePairs)
	{
		positions = this.clone(this.dictNumberTilePairs[key]);
		positions.splice(1, positions.length-2); // remove all but first and last elements
		for (j = 0; j < positions.length; ++j)
		{
			tile = grid[positions[j][0]][positions[j][1]];
			tile.isNumberEndpoint = true;
			tile.numberPath = parseInt(key);
		}
	}
	return grid;
};