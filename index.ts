const css_class         = `Slider`,
      dataset_direction = `sliderDirection`,
      dataset_duration  = `sliderDuration`;

interface Slider_slide {
	duration?: number
}

// noinspection JSUnusedGlobalSymbols
const Slider = {
	slide: ($target: HTMLElement,
	        is_show: boolean,
	        {
		        duration = 1000
	        }: Slider_slide = {}
	) => {
		// check
		if (is_show && $target.dataset[dataset_direction] === `down`) return;
		if (!is_show && $target.dataset[dataset_direction] === `up`) return;
		$target.dataset[dataset_direction] = is_show ? `down` : `up`;

		// fieldset
		if ($target instanceof HTMLFieldSetElement) $target.disabled = !is_show;

		if ($target.dataset[dataset_duration]) duration = parseInt($target.dataset[dataset_duration]!);

		// mark
		$target.classList.add(css_class);

		// transition
		$target.style.overflow = `hidden`;
		$target.style.transition = `max-height ${duration}ms, margin-top ${duration}ms, margin-bottom ${duration}ms`;

		// run
		if (!is_show) {
			const h = $target.scrollHeight;
			$target.style.maxHeight = `${h}px`;
		}
		requestAnimationFrame(() => {
			$target.style.maxHeight = `0px`;
			$target.style.marginTop = `0px`;
			$target.style.marginBottom = `0px`;

			if (is_show) {
				$target.hidden = false;
				const h = $target.scrollHeight;
				$target.style.maxHeight = `${h}px`;
				$target.style.removeProperty(`margin-bottom`);
			}
		});
	}
}

addEventListener(`transitionend`, e => {
	if (
		e.propertyName !== `max-height`
		|| !(e.target instanceof HTMLElement)
		|| !e.target.classList.contains(css_class)
	) return;

	const is_show = e.target.dataset[dataset_direction] === `down`;

	e.target.hidden = !is_show;

	e.target.classList.remove(css_class);
	e.target.style.removeProperty(`overflow`);
	e.target.style.removeProperty(`transition`);
	e.target.style.removeProperty(`max-height`);
	e.target.style.removeProperty(`margin-top`);
	e.target.style.removeProperty(`margin-bottom`);
});


export {Slider};