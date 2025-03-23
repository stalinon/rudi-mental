import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  Articulation,
  Annotation,
  Stem,
  Beam
} from 'vexflow';

const BarRendererVex = ({ barNotes, isCurrent, currentBeat }) => {
  const containerRef = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    if (!barNotes || barNotes.length === 0) return;
  
    containerRef.current.innerHTML = '';
  
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(200, 150);
    const context = renderer.getContext();
    context.setFont('Arial', 10);
  
    const stave = new Stave(10, 10, 180);
    stave.setContext(context).draw();
  
    const notes = barNotes.map((note, i) => {
      const keys = note.hit ? ['c/5'] : ['b/4'];
      const duration = note.duration || (note.hit ? '8' : '8r');
  
      const vfNote = new StaveNote({
        keys,
        duration,
        stem_direction: Stem.UP,
      });
  
      // 👻 Ghost-ноты скобками
      if (note.accent === 'ghost') {
        const ghostLeft = new Annotation(' )')
          .setVerticalJustification(Annotation.VerticalJustify.CENTER)
          .setJustification(Annotation.HorizontalJustify.LEFT)
          .setFont('Arial', 14);
        const ghostRight = new Annotation('( ')
            .setVerticalJustification(Annotation.VerticalJustify.CENTER)
            .setJustification(Annotation.HorizontalJustify.RIGHT)
            .setFont('Arial', 14);
        vfNote.addModifier(ghostLeft, 0);
        vfNote.addModifier(ghostRight, 0);
      }
  
      // 🔊 Акцент сверху
      if (note.accent === 'accent') {
        vfNote.addModifier(
          new Articulation('a>').setPosition(Articulation.Position.ABOVE), // ABOVE
          0
        );
      }
  
      // 🖐 R / L
      if (note.hand) {
        vfNote.addModifier(
          new Annotation(note.hand).setVerticalJustification(Annotation.VerticalJustify.BOTTOM),
          0
        );
      }
      return vfNote;
    });
  
  
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(notes);
  
    new Formatter().joinVoices([voice]).format([voice], 160);
    const beams = Beam.generateBeams(notes, {stemDirection: Stem.UP});
    voice.draw(context, stave);
    beams.forEach((beam) => beam.setContext(context).draw());
  }, [barNotes, isCurrent, currentBeat, theme]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: 200,
        height: 150,
        border: isCurrent ? '2px solid ' + theme.palette.primary.light : '1px dashed ' + theme.palette.primary.dark,
        borderRadius: 2,
        backgroundColor: isCurrent ? 'rgba(255,255,255,0.04)' : 'transparent',
        transition: 'all 0.2s ease',
      }}
    />
  );
};

export default BarRendererVex;
