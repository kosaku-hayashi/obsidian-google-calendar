import type { GoogleCalander, GoogleEvent } from "../helper/types";

import { Modal } from "obsidian";
import GoogleCalendarPlugin from "./../GoogleCalendarPlugin";
import EventDetailsComp from "../svelte/EventDetailsComp.svelte";

export class ViewEventEntry extends Modal {
	selectedEvent: GoogleEvent;
	currentDate: moment.Moment;
	calendarList: GoogleCalander[];
	closeFunction: () => void;

	onSubmit: () => void;
	constructor(
		selectedEvent: GoogleEvent,
		currentDate: moment.Moment,
		closeFunction?: () => void
	) {
		super(GoogleCalendarPlugin.getInstance().app);
		this.selectedEvent = selectedEvent;
		this.currentDate = currentDate;
		if(closeFunction){
			this.closeFunction = closeFunction;
		}
	}

	async onOpen(): Promise<void> {
		const { contentEl } = this;
		new EventDetailsComp({
			target: contentEl,
			props: {
				event: this.selectedEvent,
				currentDate: this.currentDate,
				closeFunction: () => {
					if(this.closeFunction){
						this.closeFunction();
					}
					this.close()
				} 
			},
		});
	}
	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
