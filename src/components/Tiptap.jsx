import './Tiptap.scss'

import { EditorContent, useEditor, Editor } from '@tiptap/react'
import React, { useEffect, useState } from 'react'
import { api } from '../services/api';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import StarterKit from '@tiptap/starter-kit'
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import ShortTextIcon from '@mui/icons-material/ShortText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Tooltip from '@mui/material/Tooltip';

import { EditorView } from 'prosemirror-view'

EditorView.prototype.updateState = function updateState(state) {
  if (!this.docView) return // This prevents the matchesNode error on hot reloads
  this.updateStateInner(state, this.state.plugins != state.plugins)
}

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }
  return (
    <>
      <Tooltip 
        title='Negrito' 
        placement="top"
      >
        <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
        >
            <FormatBoldIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Itálico' 
        placement="top"
      >
        <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
            <FormatItalicIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Riscado' 
        placement="top"
      >
        <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
        >
            <StrikethroughSIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Parágrafo' 
        placement="top"
      >  
        <IconButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
            <ShortTextIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Título 1' 
        placement="top"
      >  
        <IconButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            sx={{ fontSize: 22}}
        >
            h1
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Título 2' 
        placement="top"
      > 
        <IconButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            sx={{ fontSize: 22}}
        >
            h2
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Título 3' 
        placement="top"
      >   
        <IconButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            sx={{ fontSize: 22}}
        >
            h3
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Lista' 
        placement="top"
      >     
        <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
            <FormatListBulletedIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Lista numerada' 
        placement="top"
      >       
        <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
            <FormatListNumberedIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip 
        title='Citação' 
        placement="top"
      >         
        <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
            <FormatQuoteIcon/>
        </IconButton>
      </Tooltip>
      {/* <button onClick={() => editor.chain().focus().undo().run()}>
        undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        redo
      </button> */}
    </>
  )
}

export const Tiptap = ({characterNotes}) => {
  const [updateTextLoading, setUpdateTextLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (characterNotes.text) {
        editor.commands.setContent(JSON.parse(characterNotes.text));
    }
  }, [characterNotes])

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: ``
  });

  const updateText = async () => {
    setUpdateTextLoading(true);
    const json = editor.getJSON();

    if (JSON.stringify(json).length < 10000) {
        try {
            await api.put(`/characters/${characterNotes.id}/text`, {
                text: json
            });
    
            enqueueSnackbar("Texto atualizado.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar o texto.", { 
                variant: "error"
            });
        }
    }
    setUpdateTextLoading(false);
  }

  return (
    <Grid item xs={12} sx={{ mt: 3}}>
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor}/>
            <LoadingButton loading={updateTextLoading} onClick={updateText} fullWidth sx={{ mt: 1}}>Salvar texto</LoadingButton>
        </div>
    </Grid>
  )
}