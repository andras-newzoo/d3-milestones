import tape from 'tape';
import milestones from '../src/main';
import * as d3 from 'd3-selection';

tape('should render a minimal milestones chart with attached events', t => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    '<div id="wrapper"></div>'
  );

  const data = [
    { 'timestamp': '2012-09-09T00:00', 'detail': 'v1.0.0' },
    { 'timestamp': '2012-09-10T00:00', 'detail': 'v1.0.1' },
    { 'timestamp': '2012-09-12T00:00', 'detail': 'v1.1.0' }
  ];

  const timeline = milestones('#wrapper')
    .onEventClick((d) => {
      t.equal(d.text, 'v1.0.0', 'click event text should match label text');
    })
    .onEventMouseOver((d) => {
      t.equal(d.text, 'v1.0.0', 'mouseover event text should match label text');
    })
    .onEventMouseLeave((d) => {
      t.equal(d.text, 'v1.0.0', 'mouseover event text should match label text');
    })
    .mapping({
      timestamp: 'timestamp',
      text: 'detail'
    });

  timeline
    .parseTime('%Y-%m-%dT%H:%M')
    .aggregateBy('second')
    .optimize(true)
    .render(data);

  t.plan(3);

  d3.select('#wrapper .milestones-text-label').each(function (d, i) {
    var onClickFunc = d3.select(this).on('click');
    onClickFunc.apply(this, [d, i]);
  });

  d3.select('#wrapper .milestones-text-label').each(function (d, i) {
    var onClickFunc = d3.select(this).on('mouseover');
    onClickFunc.apply(this, [d, i]);
  });

  d3.select('#wrapper .milestones-text-label').each(function (d, i) {
    var onClickFunc = d3.select(this).on('mouseleave');
    onClickFunc.apply(this, [d, i]);
  });

  t.end();

  document.body.innerHTML = '';
});
