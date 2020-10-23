import { observable, action, computed } from 'mobx'

export default class Grid {
	@observable
	grid = KaliFormsObject.grid;

	@action
	setGrid(grid) {
		this.grid = [...grid];
	}
	@action
	addGridItem(item) {
		this.grid.push(item)
	}
	@action
	addMultipleGridItems(items) {
		this.grid = [...this.grid, ...items]
	}

	@computed
	get getGrid() {
		return this.grid;
	}

	@computed
	get lastY() {
		if (!this.grid.length) {
			return 0;
		}

		let item = this.grid[this.grid.length - 1];
		return item.y;
	}

	@action
	removeGridItem(id) {
		this.grid = [...this.grid.filter(e => e.i !== id)];
	}
}
