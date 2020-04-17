import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function FieldGroup({ groups = [], insertContent }) {
    const classes = useStyles();
    const [group, setGroup] = React.useState('');
    const [field, setField] = React.useState('');

    const handleGroup = (event) => {
        const value = event.target.value;
        setGroup(value);
    };

    const handleField = (event) => {
        setField(event.target.value);
    };

    return (
        <div className='row'>
            <div className='col-sm-3'>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Select Field Group</InputLabel>
                    <Select
                        value={group}
                        onChange={handleGroup}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {groups.map((e, i) => {
                            return <MenuItem key={i} value={e.id}>{e.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className='col-sm-3'>
                <FormControl className={classes.formControl} fullWidth disabled={group === ''}>
                    <InputLabel>Select Field</InputLabel>
                    <Select
                        value={field}
                        onChange={handleField}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {(groups.find(e => e.id === group) || { fields: [] }).fields.map((e, i) => {
                            return <MenuItem key={i} value={e.id}>{e.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className='col-sm-3'>
                <IconButton onClick={() => insertContent(`BeginGroup:${group}`)} className='mt-3' disabled={group === ''}><ArrowBackIos /></IconButton>
                <Button onClick={() => insertContent(field)} variant='outlined' color='primary' className='mt-3' disabled={group === '' || field === ''}>Insert Field</Button>
                <IconButton onClick={() => insertContent(`EndGroup:${group}`)} className='mt-3' disabled={group === ''}><ArrowForwardIos /></IconButton>
            </div>
        </div>
    );
}